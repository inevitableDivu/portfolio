import { getItem } from "./localStorage"

import { WEBSOCKET_ENDPOINT } from "@/config"

export const enum WsPollingType {
  MEDICAL_LENS = "medical_lens",
  PROMPT_EXECUTION = "author_chat",
}

const pollingURL = WEBSOCKET_ENDPOINT
const MAX_RETRY = 3

// const WEBSOCKET_POLLING_TIMEOUT = 2 * 60 * 1000 // 2 minutes timeout before starting http polling

export enum DisconnectReason {
  AWAY = "Going away",
  CLIENT = "",
}

type PollingCommonType<T, P> = {
  type: T
  data: P
}

type PollingDataType =
  | PollingCommonType<"status", { is_connected: boolean }>
  | PollingCommonType<"message", any>
  | PollingCommonType<
      "message_error",
      {
        message: string
        data?: any
      }
    >
  | PollingCommonType<
      "error",
      {
        message: string
      }
    >

export class WebSocketPolling {
  static _socket?: WebSocket

  private retryCount = 0

  private _subscribers: Record<WsPollingType, any[]> = {
    [WsPollingType.MEDICAL_LENS]: [],
    [WsPollingType.PROMPT_EXECUTION]: [],
  }

  private ws_message_queue: Record<WsPollingType, (() => any) | undefined> = {
    [WsPollingType.MEDICAL_LENS]: undefined,
    [WsPollingType.PROMPT_EXECUTION]: undefined,
  }

  connected: boolean = false

  subscribe(type: WsPollingType, callback: (data: PollingDataType) => void) {
    const index = this._subscribers[type].length
    this._subscribers[type].push(callback)

    return () => {
      this._subscribers[type] = this._subscribers[type].filter(
        (_, i) => index !== i
      )

      const shouldDisconnect = Object.values(this._subscribers).every(
        (item) => item.length < 1
      )

      if (shouldDisconnect) this.disconnect()
    }
  }

  private publish(type: WsPollingType, data: PollingDataType) {
    this._subscribers[type].forEach((cb) => cb(data))
  }

  static log(type: string, ...data: any[]) {
    console.log(
      `[WEBSOCKET_LOG] [${type.toUpperCase()}] [${new Date().toISOString()}]: `,
      ...data
    )
  }

  async setPollingFallback(type: WsPollingType, callback: () => Promise<any>) {
    this.ws_message_queue[type] = callback
    if (!this.connected && this.ws_message_queue[type]) {
      try {
        const data = await this.ws_message_queue[type]()
        this.publish(type, {
          type: "message",
          data,
        })
      } catch (error: any) {
        this.publish(type, {
          type: "message_error",
          data: {
            message:
              "message" in error ? error.message : "Something went wrong!",
          },
        })
      } finally {
        this.clearPollingFallback(type)
      }
    }
  }

  private executePollingFallback() {
    WebSocketPolling.log("info", "executing polling fallback functions...")
    Object.keys(this.ws_message_queue).map(async (type) => {
      await this.setPollingFallback(
        type as WsPollingType,
        this.ws_message_queue[type]
      )
    })
  }

  private clearPollingFallback(type: WsPollingType) {
    this.ws_message_queue[type] = () => {}
  }

  connect(type: WsPollingType, callback?: (ws: WebSocket) => void) {
    if (!WebSocketPolling._socket) {
      WebSocketPolling._socket = new WebSocket(
        `${pollingURL}?token=${getItem("ACCESS_TOKEN")}`
      )
      // @ts-ignore
      window.ws = WebSocketPolling._socket
    }
    if (!WebSocketPolling._socket) {
      WebSocketPolling.log("error", "Websocket not connected!")
      return
    }

    WebSocketPolling._socket.onopen = (data) => {
      this.connected =
        // @ts-ignore
        data.type === "open" && Boolean(data.currentTarget.readyState === 1)
      WebSocketPolling.log("open", data)

      if (this.connected) this.retryCount = 0

      this.publish(type, {
        type: "status",
        data: {
          is_connected: this.connected,
        },
      })
    }

    WebSocketPolling._socket.onmessage = (data) => {
      try {
        WebSocketPolling.log("message", JSON.parse(data.data))
        const parsedData = JSON.parse(data.data)
        if (typeof parsedData !== "object")
          this.publish(type, {
            type: "error",
            data: {
              message: "Invalid data received!",
            },
          })

        const message_type = "type" in parsedData ? parsedData.type : ""

        if (message_type === type) {
          const data = JSON.parse(parsedData.message)
          if (isFinished(data.status) || isFailed(data.status))
            this.clearPollingFallback(type)

          this.publish(type, {
            type: "message",
            data,
          })
        }
      } catch (error) {
        WebSocketPolling.log("error", error)
      }
    }

    WebSocketPolling._socket.onerror = (data) => {
      WebSocketPolling.log("error", data)
      this.executePollingFallback()
      this.publish(type, {
        type: "error",
        data: {
          message: "Something went wrong",
        },
      })
    }

    WebSocketPolling._socket.onclose = (data) => {
      WebSocketPolling.log("disconnect", data)
      if (
        data.reason === DisconnectReason.AWAY &&
        this.retryCount < MAX_RETRY
      ) {
        this.retryCount += 1
        WebSocketPolling.log("info", "retrying to connect...")
        return this.connect(type)
      }
      this.retryCount = 0
      this.disconnect(true)
      this.executePollingFallback()
    }

    if (this.connected) callback?.(WebSocketPolling._socket)
  }

  private disconnect(isServerDisconnect: boolean = false) {
    WebSocketPolling._socket?.close()
    WebSocketPolling._socket = undefined
    this.connected = false

    // this.executePollingFallback()

    if (isServerDisconnect) {
      Object.keys(this._subscribers).forEach((item) => {
        this.publish(item as WsPollingType, {
          type: "status",
          data: {
            is_connected: false,
          },
        })
      })
    }
  }

  static send(data: any) {
    if (
      WebSocketPolling._socket &&
      WebSocketPolling._socket.readyState !== WebSocket.OPEN
    ) {
      WebSocketPolling.log(
        "error",
        "Websocket not connected!",
        `STATE: ${WebSocketPolling._socket.readyState}`
      )
      return
    }
    WebSocketPolling._socket?.send(JSON.stringify(data))
  }
}

export function isFinished(status: string) {
  return ["finished", "complete", "completed", "done"].includes(status)
}

export function isInProgress(status: string) {
  return ["in_progress", "progress", "running"].includes(status)
}

export function isPending(status: string) {
  return ["pending", "queued"].includes(status)
}

export function isFailed(status: string) {
  return ["failed", "aborted"].includes(status)
}

export const wsPolling = new WebSocketPolling()

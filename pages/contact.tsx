import Wrapper from "@/components/animation-wrapper";
import Input from "@/components/ui/input";
import React from "react";

function Contact() {
	return (
		<Wrapper>
			{/* Arrange the custom input fields to make a contact form with name, email, subject, message */}

			<Input
				id="name"
				label="Name"
				name="name"
				placeholder="John Doe"
				type="text"
				onChange={(value) => console.log(value)}
			/>
			<Input
				id="email"
				label="Email"
				name="email"
				placeholder=""
				type="email"
				onChange={(value) => console.log(value)}
			/>
		</Wrapper>
	);
}

export default Contact;

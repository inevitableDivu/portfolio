import Container from "@/components/about/container";
import Stats from "@/components/about/stats";
import Wrapper from "@/components/animation-wrapper";
import Heading from "@/components/heading";
import React from "react";

function About() {
	return (
		<Wrapper>
			<Heading>About Me</Heading>
			<Container>
				<Container.Content>
					<Container.Title>Stats</Container.Title>
					<Container.Body className="flex gap-7">
						<span>
							<p className="font-bold">Line of code</p>
							<span>300K+</span>
						</span>
						<span>
							<p className="font-bold">Projects</p>
							<span>10+</span>
						</span>
						<span>
							<p className="font-bold">Experience</p>
							<span>2+</span>
						</span>
						<span>
							<p className="font-bold">Clients</p>
							<span>5+</span>
						</span>
					</Container.Body>
				</Container.Content>
				<Container.Title>Education</Container.Title>
				<Container.Body></Container.Body>
			</Container>
		</Wrapper>
	);
}

export default About;

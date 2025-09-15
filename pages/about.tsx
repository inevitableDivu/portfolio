import Container from "@/components/about/container";
import Wrapper from "@/components/animation-wrapper";
import Card from "@/components/card";
import Heading from "@/components/heading";

function About() {
	return (
		<Wrapper>
			<Container>
				<Heading>Skills</Heading>

				<div className="flex text-left">
					<div className="">
						<div>Frontend Technologies</div>

						<div className="flex">
							<span>React</span>
							<span>NextJs</span>
							<span>HTML/CSS</span>
							<span>JavaScript</span>
							<span>Gatsby</span>
						</div>
					</div>
				</div>
			</Container>
			<Container>
				<Heading>Work Experience</Heading>
			</Container>
			<Container>
				<Heading>Education</Heading>
			</Container>
			<Container>
				<Heading>Testimonials</Heading>
			</Container>
		</Wrapper>
	);
}

export default About;

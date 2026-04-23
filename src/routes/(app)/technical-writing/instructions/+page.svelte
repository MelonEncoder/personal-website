<script lang="ts">
	import Card from "$lib/components/Card.svelte";
	import TextButton from "$lib/components/TextButton.svelte";
</script>

<div class="content">
	<h1 class="title">INSTRUCTIONS</h1>

	<section class="section">
		<Card>
			<h2 class="sectionHeading">About this Project</h2>
			<p class="bodyText">
				For this project I was tasked to create a step-by-step instructional document that
				walked a reader on how to use a piece of software. I decided to create instructions
				on how to install an extension in Blender, a free and open-source 3D creation
				software. The reason I chose Blender was because I personally use it, so this felt
				like a good time to create something useful that other people can use if they are
				new to the software.
			</p>
			<p class="bodyText">
				Before I started to create any content for the instructional document, I needed to
				know what I wanted to teach and to whom. I initially wanted to share how to create a
				procedurally generated forest using Blender’s geometry nodes but quickly realized
				that I would quickly go over the 1000-word limit for the project and it would be too
				complex for new users, so I scrapped that idea and went with something simpler,
				installing extensions.
			</p>
			<p class="bodyText">
				After I had a topic, I created an outline where I started listing the actions a user
				would take to reach the desired result. First, I segmented the document into five
				sections: an introduction, installing Blender, setting up Blender, installing a
				Blender extension, and using that installed Blender extension. With these sections
				defined, I started making a basic list of steps while I used the Blender software
				for reference.
			</p>
			<p class="bodyText">
				Once I had a basic list of steps, I started working on the project draft. This draft
				also included annotated screenshots to help the reader better understand what they
				should interact with and what the results should look like. I walked through the
				steps I wrote down in the outline while using the software and in the draft fixed
				any issues I encountered and wrote down any notes the reader should be aware of. I
				reviewed my work and submitted it.
			</p>
			<p class="bodyText">
				The feedback I received pointed out a significant number of improvements. On the
				formatting side, I updated the hyperlinks to display the title of the lined web page
				rather than displaying the entire URL of the web page, which is best practice for
				technical documents and integrates better with the flow of the document. I also had
				to fix sections where I would use the first person, which should be omitted in favor
				of the second person in instructional documentation.
			</p>
			<p class="bodyText">
				In addition, I also rephrased some sections to be more descriptive of what the user
				should be seeing because describing an image as “something that looks like this”
				isn’t very helpful to readers, and specifically to those who rely on screen readers.
			</p>
			<p class="bodyText">
				From working on this project, I learned about the process of developing a useful and
				straightforward instructional document. Small details really matter when creating
				step-by-step instructions as missing one small detail, incorrect language, missing
				screenshots, and poor layout can leave a reader confused on what to do next. Good
				instructional writing must account for all of that. It also forced me to see the
				software from the perspective of new users and what kind of siutations or errors
				they might encounter.
			</p>
		</Card>
	</section>

	<section class="section">
		<div class="sectionHeader">
			<h2 class="sectionHeading">Instructions</h2>
			<p class="fileNote">
				<TextButton
					type="secondary"
					text="Open in new tab"
					onclick={() => {
						window.location.href =
							"https://files.iangillette.net/public/technical-writing/instructions.pdf";
					}}
				/>
			</p>
		</div>
		<div class="embedWrapper">
			<iframe
				class="embed"
				src="https://files.iangillette.net/public/technical-writing/instructions.pdf"
				title="Instructions Document"
				aria-label="Embedded instructions PDF"
			></iframe>
		</div>
	</section>
</div>

<style>
	.content {
		color: var(--black);
		font-family: var(--font-body), sans-serif;
	}

	.title {
		font-family: var(--font-title), monospace;
		font-size: var(--fs-title);
		color: var(--black);
		text-transform: uppercase;
		letter-spacing: 0.02em;
		margin: 0 0 1rem 0;
	}

	.section {
		margin-top: 2rem;
	}

	.sectionHeader {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.sectionHeading {
		font-family: var(--font-mono), monospace;
		font-size: var(--fs-h2);
		font-weight: 700;
		margin: 0 0 1rem 0;
		color: var(--black);
		line-height: 1.3;
		letter-spacing: 0.02em;
	}

	.bodyText {
		font-size: var(--fs-body);
		line-height: 1.7;
		margin: 0 0 1rem 0;
	}

	.bodyText:last-child {
		margin: 0;
	}

	.fileNote {
		font-size: var(--fs-body-sm);
		font-family: var(--font-mono), monospace;
		color: color-mix(in srgb, var(--black), white 30%);
		margin: 0 0 0.75rem 0;
	}

	.embedWrapper {
		border: 2px solid var(--black);
		border-radius: var(--radius-sm);
		overflow: hidden;
		background-color: var(--white);
	}

	.embed {
		display: block;
		width: 100%;
		height: 70vh;
		min-height: 480px;
		border: none;
	}
</style>

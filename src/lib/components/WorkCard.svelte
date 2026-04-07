<script lang="ts">
	import arrowOut from "$lib/assets/icons/arrow-outward.svg";

	interface Props {
		title: string;
		description?: string;
		image?: string;
		imageAlt?: string;
		imageAspectRatio?: string;
		date?: string;
		tags?: string[];
		href?: string;
	}

	let {
		title,
		description,
		image,
		imageAlt = "",
		imageAspectRatio = "16/9",
		date,
		tags = [],
		href
	}: Props = $props();
</script>

<article class="workCard">
	{#if image}
		<div class="imageFrame" style:aspect-ratio={imageAspectRatio}>
			<img src={image} alt={imageAlt || title} loading="lazy" decoding="async" />
		</div>
	{/if}
	<div class="cardInfo">
		<h2 class="cardTitle">
			{#if href}
				<a {href} rel="external noreferrer" target="_blank">{title}</a>
				<img src={arrowOut} alt="" aria-hidden="true" />
			{:else}
				{title}
			{/if}
		</h2>
		{#if description}
			<p class="cardDescription">{description}</p>
		{/if}
		{#if date || tags.length}
			<div class="cardMeta">
				{#if date}
					<span class="dateTag">{date}</span>
				{/if}
				{#if tags.length}
					<ul class="tagList" aria-label="Technologies used">
						{#each tags as tag (tag)}
							<li class="tag">{tag}</li>
						{/each}
					</ul>
				{/if}
			</div>
		{/if}
	</div>
</article>

<style>
	.workCard {
		display: flex;
		flex-direction: column;
		border: 2px solid var(--black);
		border-radius: var(--radius-sm);
		background-color: var(--white);
		overflow: hidden;
	}

	.imageFrame {
		width: 100%;
		border-bottom: 2px solid var(--black);
		overflow: hidden;
		background: color-mix(in srgb, var(--black), white 92%);
	}

	.imageFrame img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	.cardInfo {
		display: flex;
		flex-direction: column;
		flex: 1;
		padding: 1.5rem;
		gap: 0.5rem;
	}

	.cardTitle {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 0.35rem;
		font-size: var(--fs-h3);
		font-weight: 600;
		margin: 0;
		color: var(--black);
	}

	.cardTitle a {
		color: var(--black);
		text-decoration: underline;
		transition: color 0.1s ease;
	}

	.cardTitle a:hover {
		color: var(--accent);
	}

	.cardTitle img {
		width: 1.5rem;
		height: 1.5rem;
		flex-shrink: 0;
	}

	.cardDescription {
		font-size: var(--fs-body);
		line-height: 1.7;
		color: color-mix(in srgb, var(--black), white 12%);
		margin: 0;
		font-weight: 400;
	}

	.cardMeta {
		display: flex;
		flex-wrap: wrap;
		align-items: flex-end;
		gap: 0.5rem;
		margin-top: auto;
		padding-top: 0.75rem;
	}

	.tagList {
		display: flex;
		flex-wrap: wrap;
		gap: 0.45rem;
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.tag {
		padding: 0.28rem 0.55rem;
		border: 2px solid var(--black);
		border-radius: var(--radius-sm);
		background: color-mix(in srgb, var(--backlight-3), white 30%);
		font-size: var(--fs-body-sm);
		font-weight: bold;
		letter-spacing: 0.02em;
		line-height: 1.2;
	}

	.dateTag {
		padding: 0.28rem 0.55rem;
		border: 2px solid var(--black);
		border-radius: var(--radius-sm);
		background: var(--backlight-2);
		font-size: var(--fs-body-sm);
		font-weight: 700;
		letter-spacing: 0.02em;
		line-height: 1.2;
	}
</style>

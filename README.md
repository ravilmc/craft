<!-- <a href="https://novel.sh">
  <img alt="Novel is a Notion-style WYSIWYG editor with AI-powered autocompletions." src="https://novel.sh/opengraph-image.png">
  <h1 align="center">Novel</h1>
</a> -->

<p align="center">
  An open-source Notion-style WYSIWYG editor with AI extensions support.
</p>

<p align="center">
  <a href="#introduction"><strong>Introduction</strong></a> ·
  <a href="#installation"><strong>Installation</strong></a> ·
  <a href="#setting-up-locally"><strong>Setting Up Locally</strong></a> ·
  <a href="#tech-stack"><strong>Tech Stack</strong></a> ·
  <a href="#contributing"><strong>Contributing</strong></a> ·
  <a href="#fork"><strong>Fork</strong></a> ·
  <a href="#roadmap"><strong>Roadmap</strong></a> ·
  <a href="#license"><strong>License</strong></a>
</p>
<br/>

## Introduction

[Craft Editor](https://craft.sova.dev/) is a Notion-style WYSIWYG editor with AI extensions support.

<br />

## Installation

To use Craft Editor in a project, you can run the following command to install the `@ravilmc/craft` [NPM package](https://www.npmjs.com/package/@ravilmc/craft):

```
npm add @ravilmc/craft
```

Then, you can use it in your code like this:

```jsx
import { useState } from "react";
import { CraftEditor, JSONContent } from "@ravilmc/craft";

export default function App() {
  const [content, setContent] = useState < JSONContent > {};

  return (
    <CraftEditor
      content={content}
      onUpdate={(editor) => setContent(editor.getJSON())}
    />
  );
}
```

## Setting Up Locally

To set up CraftEditor locally, you'll need to clone the repository.

If you've deployed this to Vercel, you can also use [`vc env pull`](https://vercel.com/docs/cli/env#exporting-development-environment-variables) to pull the environment variables from your Vercel project.

To run the app locally, you can run the following commands:

```
pnpm i
pnpm build
pnpm dev
```

## Tech Stack

CraftEditor is built on the following stack:

- [Tiptap](https://tiptap.dev/) – extendable text editor
- [Prosemirror](https://prosemirror.net/) – text editing framework under Tiptap
- [TailwindCSS](https://tailwindcss.com/) – styles
- [Cal Sans](https://github.com/calcom/font) – font
- [Next.js](https://nextjs.org/) – framework for web app example
- [Vercel](https://vercel.com) – deployments

## Contributing

Here's how you can contribute:

- [Open an issue](https://github.com/ravilmc/craft/issues) if you believe you've encountered a bug.
- Make a [pull request](https://github.com/ravilmc/craft/pull) to add new features/make quality-of-life improvements/fix bugs.

<a href="https://github.com/ravilmc/craft/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=ravilmc/craft" />
</a>

## Repo Activity

![Craft Editor repo activity – generated by Axiom](https://repobeats.axiom.co/api/embed/c9165c2011497e5f71de0cc04345bdb4dc479b3d.svg)

## Fork

This project is an enhanced version of [Novel](https://github.com/steven-tey/novel), originally created by Steven Tey. I am forked it to introduce additional customization options, all without the constraints of maintaining backward compatibility of Novel.

I am created `@ravilmc/craft` with the aim of offering a more modular and customizable editor experience. My changes include updating dependencies, streamlining the default editor content, and disabling certain features like the Image block and AI support. These features are not gone for good; rather, I am planning to reintroduce them as optional extensions, giving you the freedom to tailor the editor to your needs.

## Roadmap

- **Documentation**: To provide detailed guides and tutorials for extending functionalities, integrating with state managers, and utilizing AI capabilities.
- **Craft Editor Control**: To seamlessly integrate with any state manager.
- **Modular AI Features**: Move AI capabilities to an extension for optional use.
- **Image Uploading as an Extension**: To give you the choice to include it or not.
- **Command Popup Customization**: Allowing the installation of various block types.
- **Independence from Vercel**: Making CraftEditor fully self-reliant for uploading, AI, analytics, and more.
- **Notion-like Menu**: For each line, features for transforming, settings, deletion, etc., will be available.
- **i18n Support**: To enable internationalization and localization for a more accessible and global user experience.

By making these changes, we aim to provide a more flexible and user-friendly editor that can be easily integrated into your existing tech stack.

## License

Licensed under the [Apache-2.0 license](https://github.com/ravilmc/craft/blob/main/LICENSE.md).

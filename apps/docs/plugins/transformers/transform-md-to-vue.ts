import type { Root } from "mdast";
import type { VFile } from "vfile";

import matter from "gray-matter";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import remarkFrontmatter from "remark-frontmatter";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";

import { read } from "to-vfile";
import { unified } from "unified";

/** @type {Plugin} */
function remarkCustom() {
  return (tree: Root, file: VFile): Root => {
    const _ids: number[] = [];
    const trash = {
      appendIndexKeyToMemory: (id: number) => _ids.push(id),
      cleanMarkdownAST: () =>
        _ids
          .map((id, i) => id - i)
          .forEach((id) => tree.children.splice(id, 1)),
    };

    const scripts: string[] = tree.children
      .filter(
        (v, i) =>
          v.type === "code" &&
          v.meta === "script" &&
          // tree.children.splice(i, 1)
          trash.appendIndexKeyToMemory(i),
      )
      .map((v) => ("value" in v ? v.value : ""));

    trash.cleanMarkdownAST();
    file.data.scripts = scripts;

    return tree;
  };
}

function generateTemplate(
  content: VFile,
  frontmatter: matter.GrayMatterFile<string>,
) {
  return `
<template>
    <div id="blog-detail-section" class="prose-base">
        ${content.value}
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

${"scripts" in content.data && Array.isArray(content.data.scripts) ? content.data.scripts.join("\n") : null}

const frontmatter = ref(${JSON.stringify(frontmatter.data)})
</script>`.trim();
}

export async function transformMdToVue(code: string) {
  const filtered = matter.read(code);

  const file = unified()
    .use(remarkCustom)
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .use(remarkFrontmatter);

  const content = await file.process(await read(code));

  return generateTemplate(content, filtered);
}

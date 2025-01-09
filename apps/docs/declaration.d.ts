declare module '*.md' {
    const component: import('vue').Component;

    const metadata: { name: string, description: string };

    export default component;
    export { metadata };
}

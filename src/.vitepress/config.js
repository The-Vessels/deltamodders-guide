import { defineConfig } from 'vitepress'

export default defineConfig({
    title: "Deltamod Modders' Guide",
    description: "An in-development modders guide",
    base: "/deltamodders-guide/",
    vite: {
        configFile: "vite.config.js"
    }
})

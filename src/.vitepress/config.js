import { defineConfig } from "vitepress";
import { withSidebar } from "vitepress-sidebar";

const config = defineConfig({
    title: "Deltamodder's Guide",
    description: "An in-development modders guide",
    base: "/deltamodders-guide/",
    vite: {
        configFile: "vite.config.js"
    },
});

const sidebarConfig = {
    documentRootPath: "/src",
    collapsed: true,
    collapseDepth: 3,
    useTitleFromFileHeading: true,
    includeRootIndexFile: false,
    includeFolderIndexFile: true,
};

export default withSidebar(config, sidebarConfig);

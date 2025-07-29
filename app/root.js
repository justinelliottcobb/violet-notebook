"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = App;
var react_router_dom_1 = require("react-router-dom");
var core_1 = require("@mantine/core");
var react_1 = require("react");
var ThemeSwitcher_1 = require("~/components/ThemeSwitcher");
var Sidebar_1 = require("~/components/Sidebar");
var theme_1 = require("~/styles/theme");
// Import styles
require("~/styles/global.scss");
// Test comment for pre-commit hook validation
function App() {
    var colorScheme = (0, react_1.useState)('light')[0];
    return (<core_1.MantineProvider theme={colorScheme === 'light' ? theme_1.lightTheme : theme_1.darkTheme}>
      <div className="flex">
        <Sidebar_1.Sidebar />
        <main className="ml-64 flex-1 min-h-screen">
          <ThemeSwitcher_1.ThemeSwitcher />
          <react_router_dom_1.Outlet />
        </main>
      </div>
    </core_1.MantineProvider>);
}

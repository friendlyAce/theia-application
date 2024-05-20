import { injectable, postConstruct } from '@theia/core/shared/inversify';
import { BaseWidget, } from '@theia/core/lib/browser';
import { AbstractViewContribution } from '@theia/core/lib/browser';
import { MenuModelRegistry } from '@theia/core';
import { Command, CommandRegistry } from '@theia/core/lib/common/command';

@injectable()
export class AngularWidget extends BaseWidget {
    public static readonly ID = 'angular-widget';
    public static readonly LABEL = 'Open Angular Widget v12'; // TODO figure out on how to auto compile and reload, similar to angular serve or watch process, instead of manually compiling, re-starting, re-building & double checking with increasing 'v version' if properly deployed

    @postConstruct()
    public init(): void {
        this.initAngularApp();
    }

    protected async initAngularApp(): Promise<void> {
        this.id = AngularWidget.ID;
        this.title.label = AngularWidget.LABEL;
        this.title.caption = AngularWidget.LABEL;
        this.title.closable = true;

        // Old way via iframe, works just fine, but requires extra host of angular app
        // this.node.innerHTML = `<iframe src="http://localhost:4200" style="border: none; width: 100%; height: 100%"></iframe>`;

        // Create a container for the angular app
        const container = document.createElement('div');
        container.id = 'theia-angular-app-container';
        this.node.appendChild(container);

        // Create root node for the ng root component of the app
        const angularAppRoot = document.createElement('app-root');
        container.appendChild(angularAppRoot);

        // Create script entry for the angular main.js
        const script = document.createElement('script');
        // After a lot of trying, the location for the browser-app sources need to be copied to: browser-app\lib\public\theia-angular-app\browser\main.js
        // TODO figure out if there is a better way, how can i expose these resources to the browser/electron app?
        // TODO figure out, package.json entry doesn't seem to do anything, i need to manually deploy sources into browser app
        // "theia": {
        //     "frontend": {
        //       "public": "lib/browser/public/theia-angular-app/browser/"
        //     }
        //   }
        script.src = 'public/theia-angular-app/browser/main.js';
        script.type = 'text/javascript';
        document.head.appendChild(script);

        this.update();
    }
}

export const AngularWidgetCommand: Command = { id: 'angular-widget:command' };

// TODO Move contributions into extra file, e. g. angular-widget-contribution.ts
@injectable()
export class AngularWidgetContribution extends AbstractViewContribution<AngularWidget> {

    constructor() {
        super({
            widgetId: AngularWidget.ID,
            widgetName: AngularWidget.LABEL,
            defaultWidgetOptions: { area: 'main' },
            toggleCommandId: AngularWidgetCommand.id
        });
    }

    public registerCommands(commands: CommandRegistry): void {
        commands.registerCommand(AngularWidgetCommand, {
            execute: () => super.openView({ activate: false, reveal: true })
        });
    }

    public registerMenus(menus: MenuModelRegistry): void {
        super.registerMenus(menus);
    }
}
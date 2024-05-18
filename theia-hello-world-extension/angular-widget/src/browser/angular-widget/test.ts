import { injectable, postConstruct } from '@theia/core/shared/inversify';
import { BaseWidget, } from '@theia/core/lib/browser';
import { AbstractViewContribution } from '@theia/core/lib/browser';
import { MenuModelRegistry } from '@theia/core';
import { Command, CommandRegistry } from '@theia/core/lib/common/command';

@injectable()
export class AngularWidget extends BaseWidget {
    static readonly ID = 'angular-widget:widget';
    static readonly LABEL = 'Angular Widget v2';

    @postConstruct()
    public init(): void {
        this.doInit();
    }


    protected async doInit(): Promise <void> {
        this.id = AngularWidget.ID;
        this.title.label = AngularWidget.LABEL;
        this.title.caption = AngularWidget.LABEL;
        this.title.closable = true;
        console.error('in do init!!! jo cool', this.node);
        this.node.innerHTML = `<iframe src="http://localhost:4200" style="border: none; width: 100%; height: 100%"></iframe>`;
        this.update();
    }
}

export const AngularWidgetCommand: Command = { id: 'angular-widget:command' };

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

    registerCommands(commands: CommandRegistry): void {
        commands.registerCommand(AngularWidgetCommand, {
            execute: () => super.openView({ activate: false, reveal: true })
        });
    }

    registerMenus(menus: MenuModelRegistry): void {
        super.registerMenus(menus);
    }
}

// export default new ContainerModule(bind => {
//     bindViewContribution(bind, AngularWidgetContribution);
//     bind(FrontendApplicationContribution).toService(AngularWidgetContribution);
//     bind(AngularWidget).toSelf();
//     bind(WidgetFactory).toDynamicValue(ctx => ({
//         id: AngularWidget.ID,
//         createWidget: () => ctx.container.get<AngularWidget>(AngularWidget)
//     })).inSingletonScope();
// });
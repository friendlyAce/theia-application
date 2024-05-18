import { ContainerModule } from '@theia/core/shared/inversify';
// import { DemoWidget } from './demo-widget-widget';
// import { DemoWidgetContribution } from './demo-widget-contribution';
import { bindViewContribution, FrontendApplicationContribution, WidgetFactory } from '@theia/core/lib/browser';

// import '../../..//style/index.css';
import { AngularWidget, AngularWidgetContribution } from '../angular-widget/test';

export default new ContainerModule(bind => {


    bindViewContribution(bind, AngularWidgetContribution);
    bind(FrontendApplicationContribution).toService(AngularWidgetContribution);
    bind(AngularWidget).toSelf();
    bind(WidgetFactory).toDynamicValue(ctx => ({
        id: AngularWidget.ID,
        // createWidget: () => ctx.container.get<AngularWidget>(AngularWidget)
        createWidget: () => {
            const widget = ctx.container.get<AngularWidget>(AngularWidget);
            widget.init();
            return widget;
        }

    })).inSingletonScope();

    // bindViewContribution(bind, DemoWidgetContribution);
    // bind(FrontendApplicationContribution).toService(DemoWidgetContribution);
    // bind(DemoWidget).toSelf();
    // bind(WidgetFactory).toDynamicValue(ctx => ({
    //     id: DemoWidget.ID,
    //     createWidget: () => ctx.container.get<DemoWidget>(DemoWidget)
    // })).inSingletonScope();
});

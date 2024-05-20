import { ContainerModule } from '@theia/core/shared/inversify';
import { bindViewContribution, FrontendApplicationContribution, WidgetFactory } from '@theia/core/lib/browser';

import { AngularWidget, AngularWidgetContribution } from './angular-root-widget';

export default new ContainerModule(bind => {
    bindViewContribution(bind, AngularWidgetContribution);
    bind(FrontendApplicationContribution).toService(AngularWidgetContribution);
    bind(AngularWidget).toSelf();
    bind(WidgetFactory).toDynamicValue(ctx => ({
        id: AngularWidget.ID,
        createWidget: () => {
            const widget = ctx.container.get<AngularWidget>(AngularWidget);
            widget.init();
            return widget;
        }

    })).inSingletonScope();
});

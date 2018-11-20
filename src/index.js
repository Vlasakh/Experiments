import Context from 'Core/Context';
import ApplicationController from 'Core/ApplicationController';
import configureStore from 'Stores/configureStore';

const context = new Context();
const store = configureStore({}, context);
const rootElement: Element = document.getElementById('root');

context.setStore(store);

const app = new ApplicationController(context);

app.initialize();
app.render(rootElement);

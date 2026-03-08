import configureStore from './reducers/index';
import rootSaga from './sagas/index';

const { store, persistor, runSaga } = configureStore();

runSaga(rootSaga);

export { persistor };
export default store;
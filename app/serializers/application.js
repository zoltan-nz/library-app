import RealtimeDatabaseSerializer from 'emberfire/serializers/realtime-database';

export default class ApplicationSerializer extends RealtimeDatabaseSerializer {
  // Fixing a Firebase bug. https://github.com/firebase/emberfire/pull/600
  // eslint-disable-next-line no-unused-vars
  normalizeCreateRecordResponse(_store, _primaryModelClass, payload, id, _requestType) {
    return { data: { id: id || payload.ref.key, attributes: payload.data, type: _primaryModelClass.modelName } };
  }
}

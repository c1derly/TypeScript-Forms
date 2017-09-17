/// <reference path=".\IDataSource.ts" />
namespace TSF.Data.Interfaces {
    export interface IAsyncDataSource extends IDataSource {
        onStartUpdate: Events.EmptyEvent;
        onEndUpdate: Events.ValueEvent<any>;
    }
}
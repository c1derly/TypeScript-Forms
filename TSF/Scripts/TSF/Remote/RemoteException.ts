/// <reference path="..\Base\Exception.ts" />
namespace TSF.Remote {
    /**
     *  Standard exception with additional detail from a remote call
     */
    export class RemoteException extends Base.Exception {
        constructor(message?) {
            super(message);
        }
        /** The return object from jquery for the remote call that had an exception*/
        jQueryXHR: JQueryXHR;
        /** The status returned from the call*/
        TextStatus: string;
        /** The url for the call that failed*/
        url: string;
        ErrorThrown: string;

    }
}
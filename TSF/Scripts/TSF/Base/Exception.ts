namespace TSF.Base {
    /**
     * Standard exception for error handeling
     */
    export class Exception {
        /**
         * Exception used for throwing
         * @param message The message for the exception
         */
        constructor(ExceptionMessage?:string) {
            this.ExceptionMessage = ExceptionMessage;
        }
        /** Message for the exception (where the actual exception message is put from a serialized c# exception */
        ExceptionMessage: string;
        ExceptionType: string;
        StackTrace: string;
        Message: string;
        Parameters: any;
        InnerException: Exception;

    }
}
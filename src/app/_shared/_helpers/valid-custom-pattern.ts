import { UntypedFormControl } from "@angular/forms";

export const validCustomPattern = (config: any) => {

    return (control: any) => {
        const urlRegEx: RegExp = config.pattern;
        if (control.value && !control.value.match(urlRegEx)) {
            return {
                pattern: config.msg.error
            };
        } else {
            return null;
        }
    };
}
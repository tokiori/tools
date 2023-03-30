import { ConvertTo, ToRequiredAll, ToStringifyAll } from '@/models/common_model'

export type ToLocales = ToRequiredAll<ToStringifyAll<{
    /** Transcript */
    transcript:{
        pageTitle: string;
        executeTitle: string;
    }
}>>
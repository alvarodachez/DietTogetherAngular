export interface FullReportInterface {
  id?: number
  athleteHasReported: string
  adminToResolve: string
  reportStatus: string
  createReportDate: Date
  reportCategory: string
  description: string;
  adminAnnotations?: string
}
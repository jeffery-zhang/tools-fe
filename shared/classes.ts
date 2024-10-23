export interface IResponseJson<T = null> {
  getData(): T | null
  getMessage(): string
  getSuccess(): boolean
  getStatus(): number
}

export class ResponseJson<T> implements IResponseJson<T> {
  constructor(
    public data: T | null,
    public success: boolean = true,
    public message: string = '',
    public status: number = 200,
  ) {}

  getData(): T | null {
    return this.data
  }
  getMessage(): string {
    return this.message
  }
  getSuccess(): boolean {
    return this.success
  }
  getStatus(): number {
    return this.status
  }
}

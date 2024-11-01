export interface IResponseJson<T = null> {
  getData(): T | null
  getMessage(): string
  getSuccess(): boolean
  getStatus(): number
}

export class ResponseJson<T> implements IResponseJson<T> {
  constructor(
    public readonly data: T | null,
    public readonly success: boolean = true,
    public readonly message: string = '',
    public readonly status: number = 200,
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

export class ResponseError extends ResponseJson<null> {
  constructor(
    public readonly message: string,
    public readonly status: number = 500,
  ) {
    super(null, false, message, status)
  }
}

import { toast } from '@/hooks/use-toast'
import { ResponseError, ResponseJson } from './classes'

export async function request<T = unknown>(
  url: string,
  config: RequestInit = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  },
): Promise<ResponseJson<T>> {
  try {
    const res = await fetch(url, config)
    const json = (await res.json()) as ResponseJson<T>

    if (!json.success) {
      console.log(json)
      toast({
        variant: 'destructive',
        title: 'Error',
        description: json.message,
      })
      return json
    }

    return json
  } catch (error) {
    return new ResponseError('Request error!', 500)
  }
}

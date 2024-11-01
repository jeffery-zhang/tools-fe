export type ToolConfig = {
  title: string
  path: string
  desc?: string
}

export const TOOL_CONFIG: ToolConfig[] = [
  {
    title: 'IP Information',
    path: '/toolbox/ipinformation',
    desc: "Show your IP address's real geographic location",
  },
  {
    title: 'Encryption',
    path: '/toolbox/encryption',
    desc: 'Encrypt/decrypt your content with multiple methods',
  },
]

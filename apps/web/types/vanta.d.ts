declare module "vanta/dist/vanta.clouds2.min" {
  type VantaInstance = { destroy: () => void; resize?: () => void }
  type Clouds2Options = {
    el: HTMLElement
    THREE?: unknown
    mouseControls?: boolean
    touchControls?: boolean
    gyroControls?: boolean
    minHeight?: number
    minWidth?: number
    scale?: number
    scaleMobile?: number
    backgroundColor?: number
    skyColor?: number
    cloudColor?: number
    lightColor?: number
    speed?: number
    texturePath?: string
  }
  const CLOUDS2: (opts: Clouds2Options) => VantaInstance
  export default CLOUDS2
}

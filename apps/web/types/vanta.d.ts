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

declare module "vanta/dist/vanta.clouds.min" {
  type VantaInstance = { destroy: () => void; resize?: () => void }
  type CloudsOptions = {
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
    cloudShadowColor?: number
    sunColor?: number
    sunGlareColor?: number
    sunlightColor?: number
    speed?: number
  }
  const CLOUDS: (opts: CloudsOptions) => VantaInstance
  export default CLOUDS
}

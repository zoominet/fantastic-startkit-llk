import autoImport from 'unplugin-auto-import/vite'

export default function createAutoImport() {
  return autoImport({
    imports: [
      'vue',
      'vue-router',
      'pinia',
    ],
    dirs: [
      './src/hooks',
    ],
    dts: './src/types/auto-imports.d.ts',
  })
}

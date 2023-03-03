export async function getDemData() {
  const json = await import('../tq08m_a_1899_12_30_01_00_00.json').then(
    ({ description, dem }) => {
      const { ncols } = description
      const cache: number[] = []
      for (let i = 0; i < dem.length; i += 2) {
        const x = dem[i]
        const cols = x % ncols
        const rows = Math.floor(x / ncols)
        const value = dem[i + 1]
        cache.push(cols, rows, value)
      }
      return { description, dem: cache }
    },
  )
  return json
}

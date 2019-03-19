import dateFormat from '@/modules/corejs/time/date-format'
describe('time', function () {
  it('format-date', function() {
    let v1 = dateFormat('2017.1.4 14:1', 'yyyy年MM月dd日 hh时mm分')
    let v2 = dateFormat('2017/1/4 14:1', 'yyyy年MM月dd日 hh时m分')
    let v3 = dateFormat('2017/1/4 14:11', 'yyyy年MM月dd日 hh时m分')
    expect(v1).toBe('2017年01月04日 14时01分')
    expect(v2).toBe('2017年01月04日 14时1分')
    expect(v3).toBe('2017年01月04日 14时11分')
  })
})

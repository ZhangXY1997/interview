import { useEffect, useRef } from 'react';

/**
 * 首次不执行，只在依赖更新时执行的 useEffect
 * @param {Function} effect - 副作用函数
 * @param {Array} deps - 依赖项数组
 */
function useUpdateEffect(effect, deps) {
  // 使用 useRef 创建一个标志位，初始值为 true，表示是第一次渲染
  const isFirstRender = useRef(true);

  useEffect(() => {
    // 如果是第一次渲染
    if (isFirstRender.current) {
      // 将标志位设为 false，并直接 return，跳过本次执行
      isFirstRender.current = false;
      return;
    }
    
    // 如果不是第一次渲染，则执行传入的 effect 函数
    // 并且将 effect 的返回值（清理函数）return 出去，保证 React 能正确处理清理逻辑
    return effect();
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps); 
}

export default useUpdateEffect;

const rechartsWidth = 800;
const rechartsHeight = 300;

// ResponsiveContainerをモックすることで「描画サイズ0」の警告を回避
// width、heightを直接指定しないと、rechartsから警告が出るため
jest.mock("recharts", () => {
  const OriginalModule = jest.requireActual("recharts");
  return {
    ...OriginalModule,
    ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
      <OriginalModule.ResponsiveContainer
        width={rechartsWidth}
        height={rechartsHeight}
      >
        {children}
      </OriginalModule.ResponsiveContainer>
    ),
  };
});

// ResizeObserverをモックすることで、rechartsのエラーを回避
global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

const originalWarn = console.warn;

// console.warnをモックすることで、「ResponsiveContainerのwidth、heightの指定がレスポンシブに対応していない」警告を回避
console.warn = (...args) => {
  if (
    args[0].includes(
      `The width(${rechartsWidth}) and height(${rechartsHeight}) are both fixed numbers`,
    )
  ) {
    return;
  }
  originalWarn(...args);
};

// 警告のモックを解除する関数
export const restoreConsoleWarn = () => {
  console.warn = originalWarn;
};

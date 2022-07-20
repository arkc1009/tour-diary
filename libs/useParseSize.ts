import { useMemo } from 'react';

interface ParamTypes {
  width: number | string;
  height: number | string;
}

const useParseSize = ({ width, height }: ParamTypes): [number, number] => {
  return useMemo(
    () => [
      typeof width === 'string' ? Number(width) : width,
      typeof height === 'string' ? Number(height) : height
    ],
    [width, height]
  );
};

export default useParseSize;

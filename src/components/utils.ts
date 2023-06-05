export const initMap = (
  y: number,
  x: number,
  sy: number,
  sx: number,
  mines: number,
) => {
  // 주어진 크기에 맞게 초기 맵 생성
  const lst = new Array<number[]>(y)
    .fill([])
    .map(() => new Array<number>(x).fill(0));

  const shuffle = () => {
    const array = new Array(y * x).fill(0);
    // 지뢰갯수 만큼 배열에 -1 생성후 랜덤 셔플
    for (let i = 0; i < mines; i++) {
      array[i] = -1;
    }
    array.sort(() => Math.random() - 0.5).sort(() => Math.random() - 0.5);

    // 2차원 배열로 변환
    for (let i = 0; i < y; i++) {
      for (let j = 0; j < x; j++) {
        lst[i][j] = array[i * x + j];
      }
    }

    // 주변 8칸에 대한 벡터값
    const dx = [0, 1, 1, 1, 0, -1, -1, -1];
    const dy = [-1, -1, 0, 1, 1, 1, 0, -1];

    // 지뢰를 제외한 칸에 주변의 지뢰갯수를 포함
    for (let i = 0; i < y; i++) {
      for (let j = 0; j < x; j++) {
        if (lst[i][j] === -1) {
          continue;
        }
        let cnt = 0;
        for (let d = 0; d < 8; d++) {
          const [a, b] = [i + dy[d], j + dx[d]];
          if (0 <= a && a < y && 0 <= b && b < x && lst[a][b] === -1) {
            cnt += 1;
          }
        }
        lst[i][j] = cnt;
      }
    }
  };

  shuffle();

  // 클릭한 지점이 0이 될때까지 셔플
  while (lst[sy][sx] !== 0) {
    shuffle();
  }

  return lst;
};

// BFS용 Node, Queue Class
class Node {
  y: number;
  x: number;
  next: Node | null;
  constructor(y: number, x: number) {
    this.y = y;
    this.x = x;
    this.next = null;
  }
}

class Queue {
  front: Node | null;
  rear: Node | null;
  size: number;
  constructor() {
    this.front = null;
    this.rear = null;
    this.size = 0;
  }

  length() {
    return this.size;
  }

  append(y: number, x: number) {
    const node = new Node(y, x);
    if (this.size === 0) {
      this.front = node;
    } else if (this.rear) {
      this.rear.next = node;
    }
    this.rear = node;
    this.size++;
  }

  popleft() {
    const value = this.front;
    this.size--;
    if (this.size === 0) {
      this.front = null;
      this.rear = null;
    } else if (this.front) {
      this.front = this.front.next;
    }
    return [value?.y, value?.x];
  }
}

export const detectZeros = (
  lst: number[][],
  vst: number[][],
  yi: number,
  xi: number,
  height: number,
  width: number,
) => {
  // 주변 8칸에 대한 벡터값
  const dx = [0, 1, 1, 1, 0, -1, -1, -1];
  const dy = [-1, -1, 0, 1, 1, 1, 0, -1];

  // que 생성
  const que = new Queue();
  // que 초기값
  que.append(yi, xi);

  // BFS로 연결된 0 주변 노드 확인해서 모두 오픈
  while (que) {
    const [y, x] = que.popleft();
    if (y === null || y === undefined || x === null || x === undefined) {
      break;
    }
    vst[y][x] = 1;
    for (let d = 0; d < 8; d++) {
      const [a, b] = [y + dy[d], x + dx[d]];
      if (0 <= a && a < height && 0 <= b && b < width) {
        if (lst[a][b] !== -1 && vst[a][b] !== 1) {
          if (lst[a][b] === 0) {
            que.append(a, b);
          }
          vst[a][b] = 1;
        }
      }
    }
  }
};

export const flagsFinder = (vst: number[][], height: number, width: number) => {
  let cnt = 0;
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (vst[i][j] === 2) {
        cnt += 1;
      }
    }
  }
  return cnt;
};

export const minesFinder = (
  lst: number[][],
  vst: number[][],
  height: number,
  width: number,
) => {
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (lst[i][j] === -1) {
        vst[i][j] = 1;
      }
      if (lst[i][j] !== -1 && vst[i][j] === 2) {
        vst[i][j] = 3;
      }
    }
  }
};

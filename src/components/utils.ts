import { OptionState } from '../store/minesSlice';

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

  // 시작점과 주변 8칸에 대한 벡터값
  const dx = [0, 1, 1, 1, 0, -1, -1, -1];
  const dy = [-1, -1, 0, 1, 1, 1, 0, -1];

  // 첫 클릭 구역 주변 유효한 범위 맵에 -2 (safe) 표시
  // 유효한 범위의 갯수를 safeCnt 에 기록
  let safeCnt = 0;
  lst[sy][sx] = -2;
  for (let d = 0; d < 8; d++) {
    const [a, b] = [sy + dy[d], sx + dx[d]];
    if (0 <= a && a < y && 0 <= b && b < x) {
      lst[a][b] = -2;
      safeCnt += 1;
    }
  }

  // safeCnt만큼을 제외한 갯수의 1차원 배열을 만들어 지뢰갯수만큼 -1 생성
  const array = new Array(y * x - safeCnt).fill(0);
  for (let i = 0; i < mines; i++) {
    array[i] = -1;
  }

  // array 랜덤셔플후 2차원 배열에 하나씩 배치
  // -2 인곳은 무조건 비어있어야 하므로 제외
  let currentIdx = 0;
  array.sort(() => Math.random() - 0.5);
  for (let i = 0; i < y; i++) {
    for (let j = 0; j < x; j++) {
      if (lst[i][j] !== -2) {
        lst[i][j] = array[currentIdx];
        currentIdx += 1;
      }
    }
  }

  // 지뢰를 제외한 모든 칸에 주변의 지뢰갯수를 표기
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
  return lst;
};

// BFS용 Node, Queue Class
// python deque와 같은 함수명으로 작명
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

// detectZeros() : 클릭한 버튼의 지뢰갯수가 0인 공간일때 인접한 0과 붙어있는 숫자 버튼을 전부 오픈
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
  vst[yi][xi] = 1;
  let pushedCnt = 1;

  // BFS로 연결된 0 주변 노드 확인해서 모두 오픈
  while (que) {
    const [y, x] = que.popleft();
    if (y === null || y === undefined || x === null || x === undefined) {
      break;
    }
    for (let d = 0; d < 8; d++) {
      const [a, b] = [y + dy[d], x + dx[d]];
      if (0 <= a && a < height && 0 <= b && b < width) {
        if (lst[a][b] !== -1 && vst[a][b] !== 1) {
          if (lst[a][b] === 0) {
            que.append(a, b);
          }
          vst[a][b] = 1;
          pushedCnt += 1;
        }
      }
    }
  }
  return pushedCnt;
};

// flagsFinder() :
// detectZeros()가 실행된 이후 지뢰가 아닌 공간에 세워진 깃발도
// 연쇄작용에 의해 오픈되어지므로 현재 깃발의 갯수를 재설정하는 함수
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

// minesFinder() :
// 지뢰를 터트려 게임에 실패했을때 지뢰가아닌 곳에 세운 깃발영역을 찾아
// 이곳에는 지뢰가 없다는 아이콘을 표시해주기 위해 실행되는 함수
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

// changeCustomOption() : 커스텀 옵션 인자의 유효성 검사 및 설정을 실행하는 함수
// 가로값의 유효범위 (1 ~ 50)
// 세로값의 유효범위 (1 ~ 50)
// 지뢰갯수 유효범위 (1 ~ 883: 50*50*1/3) 전체 버튼수의 1/3보다 높을 수 없음.
export const changeCustomOption = (
  option: OptionState,
  target: string,
  data: number,
) => {
  if (target === 'xNum') {
    if (data > 50) {
      data = 50;
    } else if (data < 8) {
      data = 8;
    }
    option.xNum = data;
  } else if (target === 'yNum') {
    if (data > 50) {
      data = 50;
    } else if (data < 8) {
      data = 8;
    }
    option.yNum = data;
  } else {
    if (data > (option.xNum * option.yNum) / 3) {
      data = Math.round((option.xNum * option.yNum) / 3);
    }
    option.minesNum = data;
  }
  if (option.minesNum > (option.xNum * option.yNum) / 3) {
    option.minesNum = Math.round((option.xNum * option.yNum) / 3);
  }
};

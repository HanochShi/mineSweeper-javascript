# mineSweeper-javascript

基于React的扫雷💣游戏，仿照Windows XP自带的扫雷制作。

可以[点击这里](http://www.shihang.ltd/minesweeper/)在线试玩。

![](https://raw.githubusercontent.com/HanochShi/mineSweeper-javascript/master/preview/beginner.png)

特性：
- 每当翻开一个周围没有雷的格子时，会自动翻开周围的八个格子，并递归进行相同操作
- 左上方计数器显示当前还没有被🚩标出的地雷数量，右上方计时器显示本局游戏当前用时，单位为秒
- 可以修改棋盘大小及雷数，其中：9 <= 行数 <= 24，9 <= 列数 <= 30，1 <= 雷数 <= (行数 - 1) * (列数 - 1)，以上边界值除了雷数最小值外均为参考原版扫雷设置

-----------



Windows-XP style Minesweeper💣 based on React.

You can [click here](http://www.shihang.ltd/minesweeper/) to play online.

Features:
- Once you flipped a cell that there're no mines around it, all cells around it will be flipped automatically and continuously
- Counter on the top left shows how many mines have not been 🚩flagged yet while timer on the top right shows how long elappsed during this game
- You can change the size of the chessboard and the total number of mines according to the following rules: 9 <= row <= 24, 9 <= column <= 30, 1 <= number of mines <= (row - 1) * (column - 1). All of the boundary value is set accoding to the original game except the minimum number of mines.

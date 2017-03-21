using System.Linq;

public class Solution {
    
    int maxRow;
    int maxColumn;
    
    public void FloodFill(int x ,int y, IList<IList<int>> source, IList<IList<int>> result){
        if(x >= maxRow || y >= maxColumn) return -1;
        if(visited[x][y]) return result[x][y];
        
        visited[x][y] = true;
        
        if(source[x][y] == 0) {
            result[x][y] = 0;
        }
        var values = new []{
            FloodFill(x +1, y, source, result),
            FloodFill(x, y +1, source, result),
            FloodFill(x -1, y, source, result),
            FloodFill(x, y - 1, source, result)
        };
        var min = result[x][y];
        
        foreach(var values in values){
            if(value < min) min = value;
        }
        result[x][y] = min;
    }
    
    public IList<IList<int>> UpdateMatrix(IList<IList<int>> matrix) {
        if(matrix == null) return matrix;
        maxRow = matrix.Length;
        
        var firstCol = martix.FirstOrDefault();
        if(firstCol == null) return matrix;
        
        var result = new IList<IList<int>>();
        
        foreach(var row in matrix)
        {
            var newRow = new List<int>();
            foreach(var column in row){
                newRow.Add(32000);
            }
            result.Add(newRow)
        }
        
        FloodFill(0, 0, matrix, result);
        return result;
    }
}
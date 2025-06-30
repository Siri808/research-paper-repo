#include <stdio.h>

int s[100], count, res[100];

void dfs(int n, int a[100][100], int source) {
    int i;
    s[source] = 1;
    for (i = 1; i <= n; i++) {
        if (a[source][i] == 1 && s[i] == 0)
            dfs(n, a, i);
    }
    count = count + 1;
    res[count] = source;
}

void topologicalDFS(int n, int a[100][100]) {
    int i, j;
    for (i = 1; i <= n; i++) {
        s[i] = 0;
    }
    count = 0;
    for (j = 1; j <= n; j++) {
        if (s[j] == 0) {
            dfs(n, a, j);
        }
    }
    for (i = n; i >= 1; i--) {
        printf("--> %d ", res[i]);
    }
    printf("\n");
}

int main() {
    int a[100][100], n, i, j;
    printf("Enter number of vertices: ");
    scanf("%d", &n);
    printf("Enter adjacency matrix:\n");
    for (i = 1; i <= n; i++)
        for (j = 1; j <= n; j++)
            scanf("%d", &a[i][j]);
    printf("Topological order using DFS:\n");
    topologicalDFS(n, a);
    return 0;
}

#include <stdio.h>

void topology(int n, int a[10][10], int sc[10]) {
    int i, j;
    for(i = 1; i <= n; i++) {
        if(sc[i] == 0) {
            printf("%d\t", i);
            sc[i] = -1;
            for(j = 1; j <= n; j++) {
                if(a[i][j] == 1)
                    sc[j]--;
            }
            i = 0; // restart from beginning to find next source node
        }
    }
}

int main() {
    int a[10][10], n, i, j, sc[10];

    printf("Program to perform Topological Sorting using Source Removal Technique\n");
    printf("Enter the number of nodes:\n");
    scanf("%d", &n);

    for(i = 1; i <= n; i++)
        sc[i] = 0;

    printf("Enter the adjacency matrix (use 1 for edge, 0 for no edge):\n");
    for(i = 1; i <= n; i++) {
        for(j = 1; j <= n; j++) {
            scanf("%d", &a[i][j]);
            if(a[i][j] == 1)
                sc[j]++;
        }
    }

    printf("The Topological Order of the given graph is:\n");
    topology(n, a, sc);

    return 0;
}

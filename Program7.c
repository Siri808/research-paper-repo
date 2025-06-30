#include <stdio.h>
#include <string.h>

int max(int a, int b) {
    return (a > b) ? a : b;
}

// LCS Function
void lcs(char a[], char b[]) {
    int m = strlen(a), n = strlen(b);
    int dp[101][101], i, j;
    char res[100];

    // Fill DP table
    for (i = 0; i <= m; i++) {
        for (j = 0; j <= n; j++) {
            if (i == 0 || j == 0)
                dp[i][j] = 0;
            else if (a[i - 1] == b[j - 1])
                dp[i][j] = dp[i - 1][j - 1] + 1;
            else
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
        }
    }

    // Build LCS string
    int len = dp[m][n];
    res[len] = '\0';
    i = m; j = n;

    while (i > 0 && j > 0) {
        if (a[i - 1] == b[j - 1]) {
            res[--len] = a[i - 1];
            i--; j--;
        } else if (dp[i - 1][j] > dp[i][j - 1]) {
            i--;
        } else {
            j--;
        }
    }

    // Print results
    printf("LCS length: %d\n", dp[m][n]);
    printf("LCS: %s\n", res);
}

// Main Function (as you asked)
int main() {
    char a[100], b[100];

    printf("Enter first string: ");
    scanf("%s", a);
    printf("Enter second string: ");
    scanf("%s", b);

    lcs(a, b);  // Call LCS logic

    return 0;
}

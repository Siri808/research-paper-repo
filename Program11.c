// Program 11: Write and execute a program to find a subset of a given set S = {s1,s2,…..,sn} of n positive
// integers whose sum is equal to a given positive integer d.
// For example, if S={1, 2, 5, 6, 8} and d = 9 there are two solutions {1,2,6} and {1,8}.
// A suitable message is to be displayed if the given problem instance doesn’t have a solution.

#include <stdio.h>

int s[10], x[10], d, flag = 0;

// Sum Of Subset Function
void sumofsub(int m, int k, int r, int n) {
    int i;
    x[k] = 1;

    if ((m + s[k]) == d) {
        flag = 1;
        printf("{ ");
        for (i = 0; i <= k; i++) {
            if (x[i] == 1)
                printf("%d ", s[i]);
        }
        printf("}\n");
    } 
    else if ((m + s[k] + s[k + 1] <= d) && (k + 1 < n)) {
        sumofsub(m + s[k], k + 1, r - s[k], n);
    }

    if ((m + r - s[k] >= d) && (k + 1 < n)) {
        x[k] = 0;
        sumofsub(m, k + 1, r - s[k], n);
    }
}

// Main Program
int main() {
    int i, n, sum = 0;

    printf("Enter number of elements:\n");
    scanf("%d", &n);

    printf("Enter the set in increasing order:\n");
    for (i = 0; i < n; i++) {
        scanf("%d", &s[i]);
        sum += s[i];
    }

    printf("Enter the desired subset sum:\n");
    scanf("%d", &d);

    if (sum < d || s[0] > d) {
        printf("No subset possible.\n");
        return 0;
    }

    sumofsub(0, 0, sum, n);

    if (flag == 0)
        printf("No subset possible.\n");

    return 0;
}

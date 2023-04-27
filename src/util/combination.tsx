export class Combination {
    static fact: number[] = [];

    public static init(n: number)
    {
        Combination.fact[0] = 1
        for(let i = 1; i <= n; ++i)
            Combination.fact[i] = i * Combination.fact[i - 1]
    }

    public static nCk(n: number, k: number)
    {
        if (n < k) return 0;
        if (n === k) return 1;
        return Combination.fact[n] / Combination.fact[k] / Combination.fact[n - k];
    }
}
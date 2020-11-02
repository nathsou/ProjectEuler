:- use_module(library(clpfd)).

strings_concat([], "").
strings_concat([S|Strs], Acc) :-
    strings_concat(Strs, Acc0),
    string_concat(S, Acc0, Acc).

pb68(Sol) :-
    length(Vars, 10),
    Vars ins 1..10,
    Vars = [A, B, C, D, E, F, G, H, I, J],
    all_distinct(Vars),
    Total #= J + D + C,
    Total #= I + C + B,
    Total #= H + B + A,
    Total #= G + A + E,
    Total #= F + E + D,
    J #=< I,
    J #=< H,
    J #=< G,
    J #=< F,
    label(Vars),
    strings_concat([J, D, C, I, C, B, H, B, A, G, A, E, F, E, D], Sol),
    string_length(Sol, 16).

query(Ans) :-
    findall(Sol, pb68(Sol), L),
    maplist(number_string, Sols, L),
    max_list(Sols, Ans).
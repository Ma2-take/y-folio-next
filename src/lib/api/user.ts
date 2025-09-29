export const fetchUser = async (uid: string) => {
  const res = await fetch("/api/portfolio/find", { // 相対パス推奨
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ uid }),
  });

  if (!res.ok) {
    throw new Error(`ユーザー取得に失敗しました: ${res.status}`);
  }

  return res.json();
};
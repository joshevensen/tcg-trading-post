export default async function userSeeds(prisma) {
  await prisma.user.upsert({
    where: { email: "josh@tcg-trading-post.com" },
    update: {},
    create: {
      name: "Josh",
      email: "josh@tcg-trading-post.com",
      password: "password",
    },
  });
}

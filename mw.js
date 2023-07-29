const protectedRoute = (allowedEmails) => async ({ req, res }) => {
  const { email } = await auth.verifyIdToken(req.cookies.__session);

  if (!allowedEmails.includes(email)) {
    res.writeHead(302, { Location: '/login' });
    res.end();
    return { props: {} };
  }

  return true;
};


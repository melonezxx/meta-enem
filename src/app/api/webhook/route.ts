import { NextResponse } from "next/server";
import { createAdminClient } from "@/utils/supabase/admin";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const email = body?.email || body?.data?.buyer?.email || body?.buyer?.email;

    if (!email) {
      return NextResponse.json({ error: "Email não informado" }, { status: 400 });
    }

    const supabase = createAdminClient();

    const { data: users, error: searchError } = await supabase.auth.admin.listUsers();

    if (searchError) {
      return NextResponse.json({ error: "Erro ao buscar usuário" }, { status: 500 });
    }

    const user = users.users.find((u) => u.email === email);

    if (!user) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
    }

    const { error: updateError } = await supabase.auth.admin.updateUserById(user.id, {
      user_metadata: { membership: "active" },
    });

    if (updateError) {
      return NextResponse.json({ error: "Erro ao ativar assinatura" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}

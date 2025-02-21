import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function Analytics() {
  return (
    <main className="container max-w-screen-xl grid grid-rows-[1fr_auto_auto] gap-4 py-4">
      <div className="grid grid-cols-[1fr_1fr_1fr] gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total de Cliques: 1234</CardTitle>
            <CardDescription>Comparado ao período anterior.</CardDescription>
          </CardHeader>
          <CardContent>
            <h2>Gráfico aqui!</h2>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Taxa de Conversão: 12%</CardTitle>
            <CardDescription>
              Quantos preencheram o formulário intermediário.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <h2>Gráfico aqui!</h2>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Dispositivos</CardTitle>
            <CardDescription>Smartphones seguem na liderança!</CardDescription>
          </CardHeader>
          <CardContent>
            <h2>Gráfico aqui!</h2>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Dados demográficos e geográficos</CardTitle>
          <CardDescription>
            Veja de onde seus visitantes acessam e suas características
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Países</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Brasil</span>
                  <span className="text-sm text-muted-foreground">78%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Estados Unidos</span>
                  <span className="text-sm text-muted-foreground">12%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Portugal</span>
                  <span className="text-sm text-muted-foreground">10%</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-2">Navegadores</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Chrome</span>
                  <span className="text-sm text-muted-foreground">65%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Safari</span>
                  <span className="text-sm text-muted-foreground">20%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Firefox</span>
                  <span className="text-sm text-muted-foreground">15%</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Comportamento do usuário</CardTitle>
          <CardDescription>
            Entenda como seus visitantes interagem com seus links
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Dispositivos</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Desktop</span>
                  <span className="text-sm text-muted-foreground">45%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Mobile</span>
                  <span className="text-sm text-muted-foreground">40%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Tablet</span>
                  <span className="text-sm text-muted-foreground">15%</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-2">Horários de pico</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">12h - 14h</span>
                  <span className="text-sm text-muted-foreground">35%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">18h - 20h</span>
                  <span className="text-sm text-muted-foreground">30%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">20h - 22h</span>
                  <span className="text-sm text-muted-foreground">25%</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}

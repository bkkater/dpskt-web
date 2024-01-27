import api from "@/services/api";

function DiscordService() {
  const Send = async (id, token, data) => {
    const { items, company, totalValue, userName } = data;
    const formatNumber = new Intl.NumberFormat();
    const now = new Date();
    let fields = [];

    items.forEach((item) => {
      const { product, amount, date } = item;

      const formatedItem = [
        {
          name: "Item",
          value: product,
          inline: true,
        },
        {
          name: "Quantidade",
          value: amount,
          inline: true,
        },
        {
          name: "Data de entrega",
          value: date,
          inline: true,
        },
        {
          name: "** **",
          value: "** **",
        },
      ];

      fields = fields.concat(formatedItem);
    });

    fields = fields.concat([
      {
        name: "Hora do pedido:",
        value: `${now.getHours()}:${now.getMinutes()}`,
      },
      {
        name: "** **",
        value: "** **",
      },
      {
        name: "Valor total do pedido:",
        value: `$ ${formatNumber.format(totalValue)}.000`,
      },
      {
        name: "** **",
        value: `:pushpin: *Bora farmar e entregar esse pedido aí morador! Favor entregar até o dia* ${items[0].date}`,
      },
      {
        name: "** **",
        value: "<@&954123127598743552>",
      },
    ]);

    const body = {
      tts: false,
      embeds: [
        {
          title: `Pedido da ${company}`,
          description: `Discord: *${userName}*`,
          color: 10038562,
          fields,
        },
      ],
    };

    try {
      await api.post(`/webhooks/${id}/${token}`, body);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    Send,
  };
}

export default DiscordService;

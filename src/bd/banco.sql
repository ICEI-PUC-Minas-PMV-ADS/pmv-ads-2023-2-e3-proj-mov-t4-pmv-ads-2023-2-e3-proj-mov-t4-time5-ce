## Produtos

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Produtos](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[descricao] [nvarchar](50) NULL,
	[valor] [float] NOT NULL,
	[estoque] [int] NOT NULL
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Produtos] ADD  CONSTRAINT [PK_Produtos] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO

## Vendas

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Vendas](
	[id_db] [int] IDENTITY(1,1) NOT NULL,
	[id_venda] [int] NOT NULL,
	[data_venda] [datetime2](7) NOT NULL,
	[forma_pagamento] [int] NOT NULL,
	[vendedor_id] [int] NOT NULL,
	[produto_id] [int] NOT NULL,
	[produto_valor] [float] NOT NULL,
	[quantidade] [int] NOT NULL
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Vendas] ADD  CONSTRAINT [PK_Vendas] PRIMARY KEY CLUSTERED 
(
	[id_db] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO


## Vendedores
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Vendedores](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[nome] [nvarchar](10) NULL
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Vendedores] ADD  CONSTRAINT [PK_Vendedores] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO

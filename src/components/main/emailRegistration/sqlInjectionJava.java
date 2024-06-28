import java.sql.*;

public class ExemploSQLInjection {

    public void buscarUsuario(String nome) {
        String query = "SELECT * FROM usuarios WHERE nome = ?";
        try {
            Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/basedados", "usuario", "senha");
            PreparedStatement stmt = conn.prepareStatement(query);
            stmt.setString(1, nome);
            ResultSet rs = stmt.executeQuery();
            
            while (rs.next()) {
                String nomeUsuario = rs.getString("nome");
                String email = rs.getString("email");
                System.out.println("Nome: " + nomeUsuario + ", Email: " + email);
            }
            
            rs.close();
            stmt.close();
            conn.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        ExemploSQLInjection exemplo = new ExemploSQLInjection();
        
        exemplo.buscarUsuario("'; DROP TABLE usuarios; --");
    }
}